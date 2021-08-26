import { GameExportData } from 'game/core/classes/Game';
import { ExportDataTitles } from 'game/core/config';
import { RendererType } from 'game/core/types/RenderersTypes';
import { BombsRendererCreator } from './bombs-renderer';
import { ExplosionsRendererCreator } from './explosions-renderer';
import { PlayersRendererCreator } from './players-renderer';
import { WallsRenderer } from './walls-renderer';

export type CanvasLayersContext = {
  ctxWalls: CanvasRenderingContext2D,
  ctxBombs: CanvasRenderingContext2D,
  ctxExplosions: CanvasRenderingContext2D,
  ctxPlayer1: CanvasRenderingContext2D,
  ctxPlayer2: CanvasRenderingContext2D,
}

export type GameRenderer = RendererType<GameExportData>

export const GameRendererCreator = (canvasLayersContext: CanvasLayersContext): GameRenderer => {
  const bombsRenderer = BombsRendererCreator(canvasLayersContext.ctxBombs);
  const explosionsRenderer = ExplosionsRendererCreator(canvasLayersContext.ctxExplosions);
  const player1Renderer = PlayersRendererCreator(canvasLayersContext.ctxPlayer1, 0);
  const player2Renderer = PlayersRendererCreator(canvasLayersContext.ctxPlayer2, 1);

  const render = (data: GameExportData) => {
    if (data[ExportDataTitles.soft_walls]) {
      WallsRenderer(canvasLayersContext.ctxWalls).render(data[ExportDataTitles.soft_walls]);
    }

    if (data[ExportDataTitles.players]) {
      if (data[ExportDataTitles.players][0]) {
        player1Renderer.render(
          data[ExportDataTitles.players][0],
          data[ExportDataTitles.players][1] !== undefined
          && !data[ExportDataTitles.players][1][ExportDataTitles.alive],
        );
      }
      if (data[ExportDataTitles.players][1]) {
        player2Renderer.render(
          data[ExportDataTitles.players][1],
          data[ExportDataTitles.players][0] !== undefined
          && !data[ExportDataTitles.players][0][ExportDataTitles.alive],
        );
      }
    }

    if (data[ExportDataTitles.bombs]) {
      bombsRenderer.render(data[ExportDataTitles.bombs]);
    }
    if (data[ExportDataTitles.explosions]) {
      explosionsRenderer.render(data[ExportDataTitles.explosions]);
    }
  };

  return {
    render,
  };
};
