if(!(/msie/i.test(navigator.userAgent))) {
	require.config({
		paths: {
			'zrender': '../static/echarts/zrender',
			'echarts': '../static/echarts',
		}
	});
	require([
		'zrender',
		'echarts',
		'echarts/chart/tree',
		'echarts/chart/bar',
		'echarts/chart/pie',
	], function (zr, echarts) {
		window.echarts = echarts;
		window.zrDefine = {
			Text: require('zrender/shape/Text'),
			Circle: require('zrender/shape/Circle'),
			ImageShape: require('zrender/shape/Image'),
			Polyline: require('zrender/shape/Polyline'),
			Polygon: require('zrender/shape/Polygon'),
			Rectangle: require('zrender/shape/Rectangle'),
		};
	});

}
