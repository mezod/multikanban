<div class="column-header">
	<span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
	<div>
		<a><%= columnName %></a>
		<a>(<%= this.length %>)</a>
	</div>
	<% if (sortType == "list") { %>
		<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
	<% } else { %>
		<span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
	<% } %>
</div>
<ul>
	<% if (columnName == "Backlog") { %>
		<li class="newTask"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></li>
	<% } %>
</ul>