<%@include file="init.jsp"%>

<script>
    var caturl = "<%=caturl%>" || '/php/metadata/csw/index.php';
    $('html').removeClass('aui');
    $('#hs-liferay-header').addClass('aui');
    $('.lfr-admin-panel').wrap("<div class='aui'></div>");
</script>

<c:choose>
    <c:when test="<%= !disabled %>">
        <script src="<%= mapconfig %>" type="text/javascript"></script>
        <div hs ng-app="hs" ng-controller="Main" style="position: relative;"></div>
        <script>
            $('html').removeClass('aui');
            $('#hs-liferay-header').addClass('aui');
        </script>
    </c:when>
</c:choose>

