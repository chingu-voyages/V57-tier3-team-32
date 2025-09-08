## PRD

[original PRD draft](https://docs.google.com/document/d/1r040zM4AO6fusfnMjCPK8TxqfH_CW5NuDRIn2JgnPBc/edit?tab=t.0)

[how we build - reference](https://docs.google.com/document/d/1Wpx_B-HE3D1EH0oRKC4nJ9xMeZWZG_pGWT2aRLPHwdc/edit?tab=t.0#heading=h.stpszijuo7rm)
##### PRD Status: In Development

---

### Mission
*Reduce PR bottlenecks and increase team velocity*

**Problem Statement:**

*Developers need a simple way to check the status of PRs without using complex project management tools.*

  

**How do we define success for our product?** 

- Time spent searching for PR updates
- Frequency of PR check visits
- User satisfaction with information accessibility
- Reduction in "what's the PR status?" inquiries via other channels

**Current Goals**
- Users can see current state of their PR in under 30 seconds
- Users don't need to navigate to external platforms or dig through email for updates
- Clear visibility into what's happening with PRs
- Users can consume information without getting pulled into complex workflows


**Current Non-Goals**

- This is read-only; users go elsewhere to create/modify
- User Authentication is not required
- No dashboards, reports, or trend analysis
- No email settings, push notifications, or alerts

**Scope Boundaries**

- This supplements, doesn't compete with full GitHub experience
- Users go elsewhere for discussions
### Features

**Epic 1: View All PRs**


**Must have: (Core Product)**  

Backend: 
Application Structure & Navigation (Header, footer)
GitHub Integration (and save JSON for tests)
Story: View Open PRs
Story: View Closed PRs

**Should have: (Enhancements to the core flow)**
Story: Use Filter (github user)
Story: Landing Page

**Could have: (Improve or compliment the user experience)** 
AI Agent

  
  
  

## Epic 1 - Stories

### User Story 0: Backend

**Requirements:**

- Inside the Header, display the application's name and the current date.    
- Implement a header, navigation bar and footer component (site map TBD)
- Inside the Footer, include a link to the project's GitHub repository and a list of the team members.

### User Story 1: Open PR View - As a developer, I need to see all open PRs waiting for review in one place

**Requirements:**

- User can choose or enter a github repository name
- Display the following data for each open PR:
- PR Number
- Title (must be a link that opens the PR on GitHub)
- Creator's account name
- Creation date
- Assigned reviewers' account names
- Last action (e.g., "created", "commented")
- Date of the last action
- Add a "Save JSON" button to download the API data for testing purposes
- Implement the logic to fetch opened PR data from the GitHub API.  


### User Story 2: Closed PR View - As a developer, I need to see all closed PRs in one place

**Requirements**
- Display the following data for each closed PR:
- PR Number
- Title (must be a link that opens the PR on GitHub)
- Creator's account name
- Creation date
- Assigned reviewers' account names
- Date the PR was closed
- Add a "Save JSON" button to download the API data for testing purposes.
- Implement the logic to fetch opened PR data from the GitHub API.


### User Story 3: Filters - As a developer, I need to quickly filter PRs

**Requirements:**
- View an interactable reusable Filter component.
- Ensure that if the filter input is empty and submitted, the full list of PRs is displayed.
- Add a text input field to the form for entering GitHub usernames.
- Add an "Apply Filter" button to submit the form (if needed)
- Implement the logic to update the displayed list of PRs when the "Apply Filter" button is clicked. The list should only show PRs that match the entered username (as either creator or reviewer).
- Add a "Clear" button to reset the filter.
- Implement the "Clear" button's functionality to clear the text input and restore the full, unfiltered list of PRs.
- Place the Filter component on both the "Open PRs" and "Closed PRs" screens. (Site Map TBD)

### User Story 4: Landing Page - As a user, would like to understand what the product’s about
**Requirements:**
- Components that advertise the purpose of the app and it's benefits. 
- Components that let user view their repo’s PRs

### Stretch Story: Add an AI Help Feature
- Add a chat icon to a corner of the application UI.
- Make the icon trigger a popup or modal when clicked.
- Integrate a basic AI agent within the popup to answer user questions.