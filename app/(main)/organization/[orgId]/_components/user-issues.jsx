import { Suspense } from "react";
import { getUserIssues } from "@/actions/organizations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssueCard from "@/components/issue-card";

/**
 * UserIssues - A component that displays the list of issues assigned to or reported by a user.
 * The issues are displayed in tabs: "Assigned to You" and "Reported by You".
 * 
 * @param {Object} props - The component properties.
 * @param {string} props.userId - The unique identifier for the user whose issues are to be fetched.
 * @returns {JSX.Element} The rendered component showing the user's issues.
 */
export default async function UserIssues({ userId }) {
  // Fetch the issues for the specified user
  const issues = await getUserIssues(userId);

  // Return null if there are no issues
  if (issues.length === 0) {
    return null;
  }

  // Filter the issues into assigned and reported based on the user's ID
  const assignedIssues = issues.filter(
    (issue) => issue.assignee.clerkUserId === userId
  );
  const reportedIssues = issues.filter(
    (issue) => issue.reporter.clerkUserId === userId
  );

  // Render the issues in two tabs: "Assigned to You" and "Reported by You"
  return (
    <>
      <h1 className="text-4xl font-bold gradient-title mb-4">My Issues</h1>

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList>
          <TabsTrigger value="assigned">Assigned to You</TabsTrigger>
          <TabsTrigger value="reported">Reported by You</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned">
          <Suspense fallback={<div>Loading...</div>}>
            <IssueGrid issues={assignedIssues} />
          </Suspense>
        </TabsContent>
        <TabsContent value="reported">
          <Suspense fallback={<div>Loading...</div>}>
            <IssueGrid issues={reportedIssues} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}

/**
 * IssueGrid - A component that renders a grid of issue cards.
 * 
 * @param {Object} props - The component properties.
 * @param {Array} props.issues - A list of issues to display in the grid.
 * @returns {JSX.Element} The rendered grid of issue cards.
 */
function IssueGrid({ issues }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} showStatus />
      ))}
    </div>
  );
}
