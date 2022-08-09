import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <div className="flex items-end">
          <Button kind="ghost" to="/manage/add-user">
            Add new user
          </Button>
        </div>
      </DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
