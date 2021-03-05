function drawTree(dataSource) {

	var margin = {top: 30, right: 10, bottom: 10, left: 10},
		width = 1200 - margin.left - margin.right,
		halfWidth = width / 2,
		height = 960 - margin.top - margin.bottom,
		halfHeight = height / 2,
		i = 0,
		duration = 500,//过渡延迟时间
		root;

	var tree = d3.layout.tree()  //d3.v3   v5为d3.tree()
		.size([width, height]);

	var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.y, d.x]; });

	var elbow = function (d, i){
		var source = calcLeft(d.source);
		var target = calcLeft(d.target);
		var hy = (target.y-source.y)/2;
		if(d.isRight) hy = -hy;
		return "M" + source.x + "," + source.y
			+ "V" + (source.y+hy)
			+ "H" + target.x + "V" + target.y;
	};
	var connector = elbow;
	var calcLeft = function(d){
		var l = d.y;
		if(!d.isRight){
			l = height - d.y;
		}
		return {x : d.x, y : l};
	};

	var treeNet = d3.select("#tree").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var getChildren = function(d){
		var a = [];
		if(d.upper) for(var i = 0; i < d.upper.length; i++){
			d.upper[i].isRight = false;
			d.upper[i].parent = d;
			a.push(d.upper[i]);
			//console.log(a)
		}
		if(d.lower) for(var i = 0; i < d.lower.length; i++){
			d.lower[i].isRight = true;
			d.lower[i].parent = d;
			a.push(d.lower[i]);
		}
		return a.length?a:null;
	};
	var toArray = function(item, arr){
		arr = arr || [];
		var i = 0, l = item.children?item.children.length:0;
		arr.push(item);
		for(; i < l; i++){
			toArray(item.children[i], arr);
		}
		return arr;
	};
	function update(source) {
		// Compute the new tree layout.
		var nodes = toArray(source);

		// Normalize for fixed-depth.
		nodes.forEach(function(d) { d.y = d.depth * 180 + halfHeight; });

		// Update the nodes…
		var node = treeNet.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });

		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
			.style('cursor', function(d) {
				return (d.children == 'null') ? d._children : '';
			})

		//设置节点：nodeEnter.append
		//矩形框 rect
		nodeEnter.append("rect")
			.attr("x",-35)
			.attr("dy",15)
			.attr("width",70)
			.attr("height",50)
			.attr("rx",10) //圆角
			.style("fill", "#ffc7aa");//d 代表数据，也就是与某元素绑定的数据。
		//文本
		nodeEnter.append("text")
			.attr("text-anchor", "middle")
			.attr("x", 0)
			.attr("dy",function(d) { return !d.people?25:10;}) //文本在框内位置
			.attr("text-anchor", "middle")
			.text(function(d) { return d.name; })
			.style("fill", "white")

		//文本2
		nodeEnter.append("text")
			.attr("text-anchor", "middle")
			.attr("x", 0)
			.attr("dy",30) //文本在框内位置
			.attr("text-anchor", "middle")
			.text(function(d) { return d.people })
			.style("fill", "#000")
			.style("fill-opacity", 1);//填充透明度

		//设置+-的圆圈
		nodeEnter.append("circle")
			.attr("r", 6)
			.attr("cy", -16)
			.style("fill",  "steelblue" )


		// Transition nodes to their new position.
		// 原有节点更新到新位置
		var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) { p = calcLeft(d); return "translate(" + p.x + "," + p.y + ")"; })
		;

		nodeUpdate.select("rect")
			.attr("x",-35)
			.attr("y", -8)
			.attr("width",70)
			.attr("height",50)
			.attr("rx",10)
			.style("fill", "#ffc7aa");

		nodeUpdate.select("text")
			.attr("text-anchor", "middle")
			.style("fill-opacity", 1);

		//代表是否展开的+-号
		nodeEnter.append("text")
			.attr("class", "isExpand")
			.attr("x", "0")
			.attr("dy", function(d) {
				return d.isRight?-10:-10;
			})
			.attr("text-anchor", "middle")
			.style("font-weight", "bold")
			.style('font-size', '18px')
			.text(function(d) {
				return d.children !=null ? "-" : "+";
			})
			.style("fill", "#ffc7aa")
			.on("click", click)

		nodeUpdate.select("circle")
			.attr("r",  function(d) {
				/*return d.children !=null ?  8 : 0;*/
				return !d._children ?  8:8
			})
			.attr("cy", function(d) {
				return d.isRight?-16:-16;
			})
			.style("fill", function(d){
				/*return d.children !=null ? "#556B2F" : "steelblue";*/
				return !d._children ? "white" : "steelblue"
			})

		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { p = calcLeft(d.parent||source); return "translate(" + p.x + "," + p.y + ")"; })
			.remove();

		nodeExit.select("rect")
			.attr("x",-35)
			.attr("y", -8)
			.attr("width",70)
			.attr("height",50)
			.attr("rx",10)
			.style("fill", "#ffc7aa");

		nodeExit.select("text")
			.attr("text-anchor", "middle")
			.style("fill-opacity", 1e-6);

		nodeExit.select('circle')
			.attr("r",6)
			.attr("cy", -16)


		// Update the links...
		var link = treeNet.selectAll("path.link")
			.data(tree.links(nodes), function(d) { return (d.target||{}).id; });

		// Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {x: source.x0, y: source.y0};
				return connector({source: o, target: o});
			});

		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", connector);

		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = calcLeft(d.source||source);
				if(d.source.isRight) o.y -= halfHeight - (d.target.y - d.source.y);
				else o.y += halfHeight - (d.target.y - d.source.y);
				return connector({source: o, target: o});
			})
			.remove();

		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			var p = calcLeft(d);
			d.x0 = p.x;
			d.y0 = p.y;
		});

		// Toggle children on click.
		function click(d) {
			//console.log(d.parent.name)
			if (d.children) {
				d._children = d.children;
				d.children = null;
				update(source);
				d3.select(this).text("+").style({
					'font-weight': 'bold',
					'font-size': '18px'
				})

			} else {
				d.children = d._children;
				d._children = null;
				update(source);
				d3.select(this).text("-").style({
					'font-weight': 'bold',
					'font-size': '23px'
				})
				console.log( d3.select(this))

				// expand all if it's the first node
				if (d.children == 'null') {
					d.children.forEach(expand);
				}
			}

		}

	}
	function expand(d) {
		if (d._children) {
			d.children = d._children;
			d.children.forEach(expand);
			d._children = null;
		}
	}
	function collapse(d) {
		if (d.children && d.children.length != 0) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
			// hasChildNodeArr.push(d);
		}
	}

	root = dataSource;
	root.x0 = width /2;
	root.y0 = height / 2;
	var t1 = d3.layout.tree().size([width, halfHeight]).children(function(d){return d.upper;}),
		t2 = d3.layout.tree().size([width, halfHeight]).children(function(d){return d.lower;});
	t1.nodes(root);//upper所有节点，包括父节点和子节点信息
	t2.nodes(root);

	var rebuildChildren = function(node){
		node.children = getChildren(node);
		if(node.children) node.children.forEach(rebuildChildren);
	};
	rebuildChildren(root);
	root.isRight = false;
	root.children.forEach(collapse);

	update(root);
}
