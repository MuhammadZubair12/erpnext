// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('HR Job Portal Dashboard', {
	refresh: function(frm) {
		erpnext.sourceData.loadData(frm);
	},
	measure: function(frm ){
		erpnext.sourceData.loadData(frm);
	},
	type: function(frm) {
		erpnext.sourceData.loadData(frm);
	}
});

erpnext.sourceData = {
	loadData: function (frm) {
		if (frm.doc.measure) {
			var measure = frm.doc.measure
		} else {
			var measure = " "
		}

		frappe.call({
			method: "erpnext.hr.doctype.hr_job_portal_dashboard.hr_job_portal_dashboard.getLeftEmployee",
			args: {
				"measure": measure,
				"type":frm.doc.type
			},
			callback: function (r) {
				if (r.message) {
					frm.EmployeeTotalJobPosted = new erpnext.EmployeeTotalJobPosted(frm, r.message);
				}
			}
		});

	}
},


erpnext.EmployeeTotalJobPosted = Class.extend({
	init: function (frm, chart_data) {
		this.frm = frm;
		this.make(frm, chart_data);
	},
	make: function (frm, chart_data) {
		var me = this;
		var html_chart_value = `<style>
.Row {
	display: table;
	width: 100%;
	table-layout: fixed; 
	border-spacing: 8px;
}
.card {
	display: table-cell;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	transition: 0.3s;
	width: 210%;
	height: 140px;

}
.card1 {
	display: table-cell;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	transition: 0.3s;
	width: 210%;
	height: 200px;

}
.card:hover {
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.container {
	padding: 2px 16px;
}
</style>
<div class="Row">



</div>
<div class="Row">



</div>

<div class = "Row">


<div class = "card1" >
<canvas id="employee_location_graph"> </canvas>
</div>

</div>

`

		$(frm.fields_dict.rent_html.wrapper).empty();
		$(html_chart_value).appendTo(frm.fields_dict.rent_html.wrapper);
		var ctx = document.getElementById('employee_location_graph').getContext('2d');
		ctx.canvas.width = 250;
		ctx.canvas.height = 500;
		var ty = chart_data.typecharts;
		var head = chart_data.labtitle;
		// var textInside = chart_data.measure[0] + chart_data.measure[1] + chart_data.measure[2] + chart_data.measure[3] + chart_data.measure[4] + chart_data.measure[5]
		var data = {
			labels: [chart_data.label[0], chart_data.label[1], chart_data.label[2], chart_data.label[3], chart_data.label[4], chart_data.label[5]],
			datasets: [{
				label: head,
				backgroundColor: ["#FF00A8", "#2AD3DA", "#46a049", "#057880", "#FF000F", "#FF8A00"],
				data: [chart_data.measure[0], chart_data.measure[1], chart_data.measure[2], chart_data.measure[3], chart_data.measure[4], chart_data.measure[5]]
				// data:[3,5,4,7,2,9]

			}]
		};

		//options

		var options = {


			showTooltips: true,

			responsive: true,
			maintainAspectRatio: false,
			title: {
				display: true,
				position: "top",
				text: "Quantity"

			},


			legend: {
				display: true,
				position: "bottom",
				labels: {
					usePointStyle: true,
					fontColor: "#333",
					fontSize: 12
				}
			},
			plugins: {
				datalabels: {
					color: '#FFFFFF',
					textAlign: 'center',
					fontSize: 14,
					font: {
						size: 0
					},

				}
			}

		};

		var chart = new Chart(ctx, {
			type: ty,
			data: data,
			options: options
		});





	}
});