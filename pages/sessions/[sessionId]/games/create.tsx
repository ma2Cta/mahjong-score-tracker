import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';

const CreateGame: React.FC = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  const [gameRound, setGameRound] = useState<string | number>('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sessions/${sessionId}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          round: gameRound,
          date,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to create game');
      }

      if (response.ok) {
        router.push(`/sessions/${sessionId}`);
      }
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Round:
        <select
          value={gameRound}
          onChange={(e) => setGameRound(Number(e.target.value))}
        >
          <option value="" disabled>Select Round</option>
          <option value={1}>東風戦</option>
          <option value={2}>半荘戦</option>
          <option value={4}>全風戦</option>
        </select>
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit">Create Game</button>
    </form>
  );
};

export default CreateGame;
