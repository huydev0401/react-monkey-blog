import { ActionDelete, ActionEdit } from "components/action";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRole, userStatus } from "utils/constants";

const renderUserStatus = (status) => {
  switch (status) {
    case userStatus.ACTIVE:
      return <LabelStatus type="success">Active</LabelStatus>;
    case userStatus.PENDING:
      return <LabelStatus type="warning">Pending</LabelStatus>;
    case userStatus.BAN:
      return <LabelStatus type="success">Ban</LabelStatus>;
    default:
      break;
  }
};
const renderUserRole = (role) => {
  switch (role) {
    case userRole.ADMIN:
      return <span className="text-red-500 font-bold">Admin</span>;
    case userRole.MODE:
      return <span className="text-blue-500 font-bold">Moderator</span>;
    case userRole.USER:
      return <span className="text-purple-500 font-bold">User</span>;

    default:
      break;
  }
};

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((user) =>
        results.push({
          id: user.id,
          ...user.data(),
        })
      );
      setUserList(results);
    });
  }, []);
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    await deleteDoc(colRef);
    toast.success("Delete user is successfully!");
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Info</th>
          <th>Username</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.length > 0 &&
          userList.map((user) => (
            <tr key={user.id}>
              <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
              <td className="whitespace-nowrap">
                <div className="flex items-center gap-x-3">
                  <img
                    className="flex-shrink-0 w-10 h-10 object-cover rounded-full"
                    src={user?.avatar}
                    alt=""
                  />
                  <div className="flex-1">
                    <h3>{user?.fullname}</h3>
                    <time className="text-gray-300">
                      {new Date().toLocaleDateString("vi-VI")}
                    </time>
                  </div>
                </div>
              </td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{renderUserStatus(user?.status)}</td>
              <td>{renderUserRole(user?.role)}</td>
              <td>
                <div className="flex items-center gap-5">
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-user?id=${user.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDeleteUser(user)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
