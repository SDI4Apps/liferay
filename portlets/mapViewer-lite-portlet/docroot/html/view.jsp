<%@include file="/html/init.jsp"%>

<div hs ng-app="hs" ng-controller="Main" style="position: relative;"></div>

<script>
    var caturl = "<%=caturl%>" || '/php/metadata/csw/index.php';
    $('html').removeClass('aui');
    $('#hs-liferay-header').addClass('aui');
    $('.lfr-admin-panel').wrap("<div class='aui'></div>");
</script>
