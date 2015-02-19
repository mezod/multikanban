<div>
	<a><%= dateCreated %></a>
	<% if (dateCompleted) { %>
		<a><%= dateCompleted %></a>
	<% } %>
	<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
	<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
</div>
<div>
	<a><%= text %></a>
</div>