<%
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
%>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />
<div class="ng-scope">
    <h1>Query builder for semantic data</h1>
    <form>
        <div class="form-group">
            <label for="graph">Graph URI</label>
            <input class="form-control" id="graph" value="http://www.sdi4apps.eu/poi.rdf"/>
        </div>
        <div class="form-group">
            <label for="graph">Geometry property</label>
            <input class="form-control" id="geometry" value="http://www.opengis.net/ont/geosparql#asWKT"/>
        </div>
        <div id="map"></div>
        <div class="form-group">
            <label for="graph">Geographical extent</label>
            <input class="form-control" id="extent" value='FILTER(bif:st_intersects(bif:st_geomfromtext("BOX(13.406410217285154 49.726199237868315, 13.506488800048826 49.74561491960256)"), ?geom)).'/>
        </div>
    </form>

    <div style="margin-top: 1em" id="table_container">
        <img id="loader4table" src="/js/semantic_query/ajax-loader.gif"/>

    </div>
    <img id="loader4suggestions" src="/js/semantic_query/ajax-loader.gif"/>
    <pre class="generated_code"></pre>
    <button class="btn btn-success" id="run">Run</button>
    <button class="btn btn-default" id="show_publish">Publish</button>

    <p>
        <div id="results"></div>
    </p>
    <div class="modal fade" tabindex="-1" role="dialog" id="publish_dialog">
        <div class="modal-dialog  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Publish query</h4>
                </div>
                <div class="modal-body">
                    <form class="form">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" class="form-control" id="description" placeholder="Description">
                        </div>
                        <div class="form-group">
                            <label for="keywords">Keywords</label>
                            <input type="text" class="form-control" id="keywords">
                        </div>

                        <fieldset>
                        <legend>Contact info</legend>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="control-label">First Name</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="first_name" name="first_name" placeholder="First Name" class="form-control"  type="text">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="control-label" >Last Name</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="last_name" name="last_name" placeholder="Last Name" class="form-control"  type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="control-label">E-Mail</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                        <input id="email" name="email" placeholder="E-Mail Address" class="form-control"  type="email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="control-label">Organization</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-briefcase"></i></span>
                                        <input id="organization" name="organization" placeholder="Organization name" class="form-control" type="text">
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="control-label">Address</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                        <input id="address" name="address" placeholder="Address" class="form-control" type="text">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="control-label">City</label>
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                        <input id="city" name="city" placeholder="city" class="form-control"  type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        </fieldset>

                        <div class="form-group">
                            <label for="lineage">Lineage statement</label>
                            <textarea class="form-control" id="lineage"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="resource_locator">URL</label>
                            <textarea class="form-control" id="resource_locator"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="publish">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" tabindex="-1" role="dialog" id="publish_json_dialog">
        <div class="modal-dialog  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Publish query</h4>
                </div>
                <div class="modal-body" id="json_result">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!--  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!--<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>-->
</div>
