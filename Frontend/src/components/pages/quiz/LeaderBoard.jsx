import { useState, useEffect } from "react";
import { Trophy, Medal, Crown } from "lucide-react";
import { getLeaderboard } from "../../../services/users/user";

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await getLeaderboard();
                setLeaderboardData(response.leaderboard);
                setIsLoading(false);
            } catch (error) {
                setError("Failed to fetch leaderboard data");
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading leaderboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center p-6 bg-slate-900 rounded-xl border border-red-500/30 max-w-md">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center justify-center">
                        <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
                        Leaderboard
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto"></div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-800">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rank</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Tokens</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {leaderboardData.map((user, index) => (
                                    <tr 
                                        key={user._id}
                                        className={`hover:bg-slate-800/50 transition-colors ${
                                            index === 0 ? 'bg-yellow-500/10' :
                                            index === 1 ? 'bg-slate-400/10' :
                                            index === 2 ? 'bg-amber-700/10' : ''
                                        }`}
                                    >
                                        <td className="px-6 py-4 text-slate-300">
                                            <div className="flex items-center">
                                                {index === 0 && <Crown className="h-5 w-5 text-yellow-500 mr-2" />}
                                                {index === 1 && <Medal className="h-5 w-5 text-slate-400 mr-2" />}
                                                {index === 2 && <Medal className="h-5 w-5 text-amber-700 mr-2" />}
                                                {index > 2 && <span className="text-slate-500 mr-2">#{index + 1}</span>}
                                                <span className={`
                                                    ${index === 0 ? 'text-yellow-500' : ''}
                                                    ${index === 1 ? 'text-slate-400' : ''}
                                                    ${index === 2 ? 'text-amber-700' : ''}
                                                `}></span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center mr-3">
                                                    <span className="text-white font-medium">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-slate-200">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-cyan-400 font-medium">{user.tokens}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
