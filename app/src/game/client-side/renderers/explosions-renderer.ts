import { ExplosionExportData } from 'game/core/classes/entities/Explosion';
import { SpritesExplosion } from 'game/core/classes/sprites/SpritesExplosion';
import { ExportDataTitles } from 'game/core/config';
import { RendererType } from 'game/core/types/RenderersTypes';

type ExplosionRenderer = RendererType<ExplosionExportData[]>

export const ExplosionsRendererCreator = (context: CanvasRenderingContext2D): ExplosionRenderer => {
  const cache: Record<string, SpritesExplosion> = {};

  const render = (data: ExplosionExportData[]) => {
    data.forEach((obj: ExplosionExportData) => {
      const [x, y] = obj[ExportDataTitles.position];

      if (!cache[`${x}:${y}`]) {
        cache[`${x}:${y}`] = new SpritesExplosion(
          context,
          { x, y },
          obj[ExportDataTitles.frame_type],
          obj[ExportDataTitles.direction],
        );
      }
    });

    Object.values(cache).forEach((sprite) => {
      const dataExists = data.some((exData) => {
        const [px, py] = exData[ExportDataTitles.position];
        return px === sprite.pos.x && py === sprite.pos.y;
      });
      if (!dataExists) {
        sprite.destroy();
        delete cache[`${sprite.pos.x}:${sprite.pos.y}`];
      }
    });
  };

  return {
    render,
  };
};
