//@ts-ignore
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/login/login.page";
// import ManagerDashboardPage from "@/pages/manager/manager.dashboard.page";

import ManagerSidebar from "@/pages/manager/manager.sidebar";
import ManagerGestionPlace from "@/pages/manager/manager.gestionPlace.page";
import ManagerDashboardPage from "@/pages/manager/manager.dashboard.page";
import ManagerProfilePage from "@/pages/manager/manager.profile.page";

import NotFound from "@/pages/404/404.page";

import "@/common/styles/index";
import RhSide from "@/pages/Rh/rh.side";
import RhDashboard from "@/pages/Rh/rh.dashbooard.page";
import RhCollaborateursList from "@/pages/Rh/rh.collaborateurs.list.page";
import RhProfilePage from "@/pages/Rh/rh.profile.page";
import CollSidebar from "@/pages/coll/coll.sidebar";
import CollProfilePage from "@/pages/coll/coll.profile.page";
import CollPlaningPage from "@/pages/coll/coll.planing.page";
import MangersList from "@/components/rh/rh.managers.list.component";
import ProfileSearch from "@/components/search/profileSearch_collaborateur_component";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const App = () => {
  let [userRole] = useLocalStorage<any>("data");
  return (
    <>
      <SkeletonTheme>
        <Routes>
          {/* // checking the role before entering the HR route */}
          {userRole?.role === "rh" ? (
            <Route path='rh' element={<RhSide />}>
              <Route index element={<RhDashboard />} />
              <Route path='profile' element={<RhProfilePage />} />
              <Route
                path='collaborateursList'
                element={<RhCollaborateursList />}
              />
              <Route path='searchProfile/:userId' element={<ProfileSearch />} />
              <Route path='listManagers' element={<MangersList />} />
              <Route path='searchProfile/:userId' element={<ProfileSearch />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          ) : (
            <Route path='/' element={<LoginPage />} />
          )}

          {/* // checking the role before entering the BU route */}
          <Route path='/bu' element={<LoginPage />} />
          {userRole?.role === "collaborateur" ? (
            <Route path='coll' element={<CollSidebar />}>
              <Route index element={<CollPlaningPage />} />
              <Route path='profile' element={<CollProfilePage />} />
              <Route path='searchProfile/:userId' element={<ProfileSearch />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          ) : (
            <Route path='/' element={<LoginPage />} />
          )}

          {/* // checking the role before entering the Manager route */}
          {userRole?.role === "manager" ? (
            <Route path='manager' element={<ManagerSidebar />}>
              <Route index element={<ManagerDashboardPage />} />
              <Route path='gestionPlace' element={<ManagerGestionPlace />} />
              <Route path='profile' element={<ManagerProfilePage />} />
              <Route path='searchProfile/:userId' element={<ProfileSearch />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          ) : (
            <Route path='/' element={<LoginPage />} />
          )}

          {/* // Default Route */}
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </SkeletonTheme>
    </>
  );
};

export default App;
