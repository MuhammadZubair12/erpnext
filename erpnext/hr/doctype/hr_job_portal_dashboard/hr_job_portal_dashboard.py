# -*- coding: utf-8 -*-
# Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class HRJobPortalDashboard(Document):
	pass

@frappe.whitelist()
def job_title_filter(jt=None):
	conditions = ""
	if jt!=" ": conditions += " and status = '{0}'".format(jt)
	return conditions
def measure_filter(damount=None):
	conditions = ""
	if damount!=" ": conditions += " and measure = '{0}'".format(damount)
	return conditions

@frappe.whitelist()
def getLeftEmployee(measure=None, type=None):
	measuredata = measure_filter(measure)
	typechart = ""
	
	if type == "Bar":
		typechart = "bar"
	if type == "Doughnut":
		typechart = "doughnut"
	elif type == "Pie":
		typechart = "pie"
	elif type == "Line":
		typechart = "line"
	flat_list = []
	
	if measure == "Active":
		labtitle = "Active"
		label = frappe.db.sql("""  select DISTINCT(date_of_joining),COUNT(*) from `tabEmployee` where docstatus<2  GROUP BY date_of_joining """)
		total_employee = frappe.db.sql(""" select COUNT(employee) from `tabEmployee` where status = "Active" GROUP BY date_of_joining """)
		# frappe.msgprint(frappe.as_json(total_employee))
		for tm in total_employee:
			for item in tm:
				flat_list.append(item)
				# frappe.msgprint(frappe.as_json(item))
		return{"measure":flat_list, "typecharts":typechart, "label":label, "labtitle":labtitle}
	elif measure == "Left":
		labtitle = "Left"
		label = frappe.db.sql("""  select DISTINCT(date_of_joining),COUNT(*) from `tabEmployee` where docstatus<2  GROUP BY date_of_joining """)
		total_employee = frappe.db.sql(""" select COUNT(employee) from `tabEmployee` where status = "Left" GROUP BY date_of_joining """)
		# frappe.msgprint(frappe.as_json(total_employee))
		for tm in total_employee:
			for item in tm:
				flat_list.append(item)
				# frappe.msgprint(frappe.as_json(item))
		return{"measure":flat_list, "typecharts":typechart, "label":label, "labtitle":labtitle}


@frappe.whitelist()
def getEmployee1(measure=None, type=None):
	measuredata = measure_filter(measure)
	typechart = ""
	if type == "Bar":
		typechart = "bar"
	if type == "Doughnut":
		typechart = "doughnut"
	elif type == "Pie":
		typechart = "pie"
	flat_list = []
	label = frappe.db.sql("""  select DISTINCT(date_of_joining),COUNT(*) from `tabEmployee` where docstatus<2  GROUP BY date_of_joining ORDER BY 1 DESC  """)
	total_employee = frappe.db.sql(""" select DISTINCT(employee),COUNT(*) from `tabEmployee` where docstatus<2 GROUP BY date_of_joining ORDER BY 1 DESC """)
	frappe.msgprint(frappe.as_json(total_employee))
	for tm in total_employee:
		for item in tm:
			flat_list.append(item)
	return{"measure":flat_list, "typecharts":typechart, "label":label}