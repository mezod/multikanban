<div class="column-header">
	<span class="glyphicon glyphicon-sort dateCreatedSort" aria-hidden="true"></span>
	<div>
		<a><%= columnName %></a>
		(<a id="counter"></a>)
	</div>
	<% if (sortType == "list") { %>
		<span class="glyphicon glyphicon-th-list customSort selected" aria-hidden="true"></span>
	<% } else { %>
		<span class="glyphicon glyphicon-sort dateCompletedSort selected" aria-hidden="true"></span>
	<% } %>
</div>
<ul id="<%= columnId %>" class="column-list">
	<% if (columnName == "Backlog") { %>
		<li class="newTask"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></li>
		<li class="inputTask"><input id="newTask" type="text" name="newTask" placeholder="Add new task"/><span class="glyphicon glyphicon-plus submitTask" aria-hidden="true"></span></li>
	<% } %>
</ul>