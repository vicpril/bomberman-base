import { PlayerExportData } from 'game/core/classes/entities/Player';
import { SpritesPlayer } from 'game/core/classes/sprites/SpritesPlayer';
import { SpritesPlayerDefeat } from 'game/core/classes/sprites/SpritesPlayerDefeat';
import { SpritesPlayerVictory } from 'game/core/classes/sprites/SpritesPlayerVictory';
import { ExportDataTitles } from 'game/core/config';

type PlayersRenderer = {
  render: (data: PlayerExportData, isWinner: boolean) => void;
}

export const PlayersRendererCreator = (context: CanvasRenderingContext2D, idx = 0): PlayersRenderer => {
  const cache: Record<number, SpritesPlayer | SpritesPlayerDefeat | SpritesPlayerVictory> = {};

  const render = (player: PlayerExportData, isWinner: boolean = false) => {
    if (!player[ExportDataTitles.alive]) {
      // defeat
      if (!cache[0]) {
        delete cache[2];
        cache[0] = new SpritesPlayerDefeat(
          context,
          player[ExportDataTitles.coords],
        );
      }
    } else if (isWinner) {
      // victory
      if (!cache[1]) {
        delete cache[2];
        cache[1] = new SpritesPlayerVictory(
          context,
          player[ExportDataTitles.coords],
          idx !== 0,
        );
      }
    } else if (!cache[2]) {
      // default
      cache[2] = new SpritesPlayer(
        context,
        player[ExportDataTitles.coords],
        idx !== 0,
      );
    } else {
      cache[2].setCoords(player[ExportDataTitles.coords]);
      (cache[2] as SpritesPlayer).setDirection(player[ExportDataTitles.movement]);
    }
  };

  return {
    render,
  };
};
