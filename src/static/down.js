function downloadFile(fileName, content) {
	let aLink = document.createElement('a');
	let blob = this.base64ToBlob(content); //new Blob([content]);

	let evt = document.createEvent('HTMLEvents');
	evt.initEvent('click', true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
	aLink.download = fileName;
	aLink.href = URL.createObjectURL(blob);

	// aLink.dispatchEvent(evt);
	aLink.click();
}

//base64转blob
function base64ToBlob(code) {
	let parts = code.split(';base64,');
	let contentType = parts[0].split(':')[1];
	let raw = window.atob(parts[1]);
	let rawLength = raw.length;

	let uInt8Array = new Uint8Array(rawLength);

	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}
	return new Blob([uInt8Array], { type: contentType });
}

function download(contents) {
	var content = contents || document.getElementById('app');
	var time = new Date().getTime();
	html2canvas(content, {
		allowTaint: true,
		scale:2, // 提升画面质量，但是会增加文件大小
		onrendered: function (canvas) {
			var contentWidth = canvas.width;
			var contentHeight = canvas.height;
			console.log(contentHeight);
			// 一页pdf显示html页面生成的canvas高度;
			var pageHeight = contentWidth / 592.28 * 841.89;
			// 未生成pdf的html页面高度
			var leftHeight = contentHeight;
			// pdf页面偏移
			var position = 0;
			// a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
			var imgWidth = 595.28;
			var imgHeight = 592.28 / contentWidth * contentHeight;
			var pageData = canvas.toDataURL('image/jpeg', 1.0);
			// window.open(pageData,'_blank');
			downloadFile('测试.png', pageData)
			// console.log(pageData);
			// eslint-disable-next-line
			var pdf = new jsPDF('', 'pt', 'a4');
			// 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
			// 当内容未超过pdf一页显示的范围，无需分页
			if (leftHeight < pageHeight) {
				pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
			} else {
				while (leftHeight > 0) {
					pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
					leftHeight -= pageHeight;
					position -= 841.89;
					// 避免添加空白页
					if (leftHeight > 0) {
						pdf.addPage();
					}
				}
			}
			// 导出pdf文件命名
			pdf.save('report_pdf_' + new Date().getTime() + '.pdf');
			console.log(new Date().getTime() - time);
		},
	});
}
