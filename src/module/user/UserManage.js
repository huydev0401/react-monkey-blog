import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";

const UserManage = () => {
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
