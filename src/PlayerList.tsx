import React from "react";
import { Player, Team } from "./models";

interface IPlayerListProps {
  players: Player[];
  searchText: string;
  teams: Team[];
}

export const PlayerList: React.FC<IPlayerListProps> = React.memo(
  ({ players, searchText, teams }) => {
    const filtered = players.filter((item) =>
      item.first_name
        .toLowerCase()
        .concat(" ")
        .concat(item.second_name.toLowerCase())
        .includes(searchText.toLowerCase())
    );

    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Team</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>CS</th>
            <th>TOT Points</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{`${player.first_name} ${player.second_name}`}</td>
              <td>{`${
                teams.find((team) => team.id === player.team)?.name
              }`}</td>
              <td>{`${player.goals_scored}`}</td>
              <td>{`${player.assists}`}</td>
              <td>{`${player.clean_sheets}`}</td>
              <td>{`${player.total_points}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
