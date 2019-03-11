# ContributorFocus

  The Hypothesis client supports a query syntax that filters the cards displayed in the sidebar. For a given URL, e.g. <span class="emphasis">http://example.com</span>, you can 
  focus on threads involving a particular user, e.g. <span class="emphasis">Jane</span>, like so:
  <span class="emphasis">https://example.com</span>#annotations:query:user:<span class="emphasis">Jane</span>. This tool automates the construction of those links. 

  To focus on users contributing to discussion on a particular URL, specify the URL. If the annotations are not in Public, also choose the group. Then 
  click <i>search</i> to produce a per-user link for each user who has annotated the selected URL in the selected group. Click each user's name to 
  launch the Hypothesis client in a mode that focuses on threads involving that user.
  
  If the group you choose isn't the sticky default in the Hypothesis client, you'll need to make it so. If you specify a group other than Public, you'll 
  need to provide your API token to read from that group. If you don't specify a URL, the tool provides per-user links for all URLs annotated in the group.

