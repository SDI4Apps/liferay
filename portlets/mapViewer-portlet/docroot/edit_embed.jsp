<%@page import="javax.portlet.PortletPreferences"%>
<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet" %>
<%@ page import="com.liferay.portal.service.*" %>
<portlet:defineObjects />

<%
PortletPreferences prefs = renderRequest.getPreferences();
String permalink = prefs.getValue("permalink", "");
String height = prefs.getValue("height", "300");
String width = prefs.getValue("width", "300");

if((request.getParameter("permalink")!=null)&&(!request.getParameter("permalink").equals(""))){
permalink = request.getParameter("permalink");
prefs.setValue("permalink",request.getParameter("permalink"));
prefs.store();
}
if((request.getParameter("height")!=null)&&(!request.getParameter("height").equals(""))){
height = request.getParameter("height");
prefs.setValue("height",request.getParameter("height"));
prefs.store();
}
if((request.getParameter("width")!=null)&&(!request.getParameter("width").equals(""))){
width = request.getParameter("width");
prefs.setValue("width",request.getParameter("width"));
prefs.store();
}
%>

<%if (renderRequest.getAttribute("errorMessage") != null) { %>
            <font color="red"><b><%=renderRequest.getAttribute("errorMessage")%></b></font>
<%} else { %>
            <br>
<%}%>
<form action="<portlet:renderURL />" method="post" name="<portlet:namespace />fm">
<table>
            <tr>
                <td><b>Permalink ID: </b></td>
                <td><input name="permalink" type="text" size="30" value="<%= permalink %>"></td>
            </tr>
            <tr>
                <td><b>Width: </b></td>
                <td><input name="width" type="text" size="5" value="<%= width %>"><br /></td>
            </tr>
            <tr>
                <td><b>Height: </b></td>
                <td><input name="height" type="text" size="5" value="<%= height %>"><br /></td>
            <tr>
            <tr>
                <td></td>
                <td><input class="portlet-form-button" type="button" value="Save" onClick="submitForm(document.<portlet:namespace />fm);"></td>
            </tr>
</table>
</form>
