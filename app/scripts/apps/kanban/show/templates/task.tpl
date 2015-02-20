<div>
	<a><%= dateCreated %></a>
	<% if (dateCompleted) { %>
		<a><%= dateCompleted %></a>
	<% } %>
	<span class="glyphicon glyphicon-remove deleteTask" aria-hidden="true"></span>
	<span class="glyphicon glyphicon-pencil editTask" aria-hidden="true"></span>
</div>
<div>
	<a><%= text %></a>
</div>