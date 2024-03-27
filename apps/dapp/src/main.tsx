import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { GlobalStyle } from 'styles/GlobalStyle';
import { AppProvider } from 'providers/AppProvider';
import NotificationManager from 'components/Notification/NotificationManager';

import NexusPage from 'components/Pages/Nexus/Relic';
import QuestPage from 'components/Pages/Nexus/Quest';
import CoreLayout from 'components/Layouts/CoreLayout';
import ForgePage from 'components/Pages/Nexus/Forge';
import NexusUserManual from 'components/Pages/Nexus/Manual/UserManual';
import NexusPartnerManual from 'components/Pages/Nexus/Manual/PartnerManual';
import { NexusGates } from 'components/Pages/Nexus/NexusGates';
import NexusLibrary from 'components/Pages/Nexus/Quests/FirstQuest/Library';
import Quiz from 'components/Pages/Nexus/Quests/FirstQuest/Quiz';
import PotMint from 'components/Pages/Nexus/Quests/PathOfTemplar';
import OrigamiPage from 'components/Pages/Nexus/Origami';
import DevCollectSlide from 'components/Pages/Nexus/Quests/FirstQuest/Quiz/DevCollectSlide';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="" element={<NexusGates />} />
            <Route path="/nexus/*" element={<CoreLayout mode="nexus" />}>
              <Route path="" element={<Navigate to="relic" />} />
              <Route path="relic/*" element={<NexusPage />} />
              <Route path="quests/*" element={<QuestPage />} />
              <Route path="forge/*" element={<ForgePage />} />
              <Route path="help" element={<NexusUserManual />} />
              <Route path="partner" element={<NexusPartnerManual />} />
            </Route>
            <Route
              path="/nexus/quests/library"
              element={
                <>
                  <CoreLayout headless mode="nexus" />
                  <NexusLibrary />
                </>
              }
            />
            <Route
              path="/nexus/quests/quiz"
              element={
                <>
                  <CoreLayout headless mode="nexus" />
                  <Quiz />
                </>
              }
            />
            <Route
              path="/nexus/quests/quiz/dev/mint"
              element={
                <>
                  <CoreLayout headless mode="nexus" />
                  <DevCollectSlide />
                </>
              }
            />
            <Route
              path="/nexus/quests/pathoftemplar/:enclave"
              element={
                <>
                  <CoreLayout headless mode="nexus" />
                  <PotMint />
                </>
              }
            />
            <Route
              path="/origami"
              element={
                <>
                  <CoreLayout headless mode="nexus" />
                  <OrigamiPage />
                </>
              }
            />
          </>
        </Routes>
      </BrowserRouter>
      <NotificationManager />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
