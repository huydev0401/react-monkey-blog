import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import React, { Suspense } from "react";
const HomePage = React.lazy(() => import("pages/HomePage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const AuthorPage = React.lazy(() => import("pages/AuthorPage"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const PostManage = React.lazy(() => import("module/post/PostManage"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryManage")
);
const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);
const DashboardLayout = React.lazy(() =>
  import("module/dashboard/DashboardLayout")
);

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<AuthorPage></AuthorPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
