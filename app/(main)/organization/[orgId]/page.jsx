import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrganization } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "./_components/project-list";
import UserIssues from "./_components/user-issues";

/**
 * OrganizationPage - A server-side rendered page for displaying details about an organization, 
 * including its projects and user-specific issues.
 * 
 * @param {Object} props - The component properties.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.orgId - The unique identifier of the organization.
 * @returns {JSX.Element} The rendered organization page or an error message.
 */
export default async function OrganizationPage({ params }) {
  const { orgId } = params; // Extract organization ID from route parameters
  const { userId } = auth(); // Get the authenticated user ID

  // Redirect to the sign-in page if the user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch the organization details based on the provided orgId
  const organization = await getOrganization(orgId);

  // Display a fallback message if the organization is not found
  if (!organization) {
    return <div>Organization not found</div>;
  }

  // Render the organization page with its projects and user issues
  return (
    <div className="container mx-auto px-4">
      {/* Header section with organization name and organization switcher */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name} Projects
        </h1>
        <OrgSwitcher />
      </div>

      {/* Project list section */}
      <div className="mb-4">
        <ProjectList orgId={organization.id} />
      </div>

      {/* User-specific issues section */}
      <div className="mt-8">
        <UserIssues userId={userId} />
      </div>
    </div>
  );
}
