import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RaffleDetailPage from './pages/RaffleDetailPage';
import RaffleListPage from './pages/RaffleListPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CreateRafflePage from './pages/CreateRafflePage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/raffle/:id" element={<RaffleDetailPage />} />
        <Route path="/raffles/:type/:status" element={<RaffleListPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/create" element={<CreateRafflePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}
