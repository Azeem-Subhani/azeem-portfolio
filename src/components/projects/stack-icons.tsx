import { cn } from "@/lib/utils";
import type { StackIconId } from "@/types/content";
import {
  angular,
  aws_dark,
  aws_light,
  django,
  expressjs,
  expressjs_dark,
  firebase,
  graphql,
  ionic,
  javascript,
  jwt,
  mongodb_icon_dark,
  mongodb_icon_light,
  nestjs,
  nextjs_icon_dark,
  nodejs,
  postgresql,
  react_dark,
  react_light,
  redux,
  socketio_icon_dark,
  socketio_icon_light,
  stripe,
  typescript,
} from "@/components/projects/svgl-markup";

type StackIconProps = {
  id: StackIconId;
  label: string;
};

type SvglSrc =
  | { svg: string; invertOnDark?: boolean }
  | { light: string; dark: string };

const SVGL: Partial<Record<StackIconId, SvglSrc>> = {
  react: { light: react_light, dark: react_dark },
  nextjs: { svg: nextjs_icon_dark, invertOnDark: true },
  typescript: { svg: typescript },
  django: { svg: django },
  stripe: { svg: stripe },
  postgresql: { svg: postgresql },
  angular: { svg: angular },
  ionic: { svg: ionic },
  nestjs: { svg: nestjs },
  nodejs: { svg: nodejs },
  express: { light: expressjs, dark: expressjs_dark },
  mongodb: { light: mongodb_icon_light, dark: mongodb_icon_dark },
  firebase: { svg: firebase },
  firestore: { svg: firebase },
  socketio: { light: socketio_icon_light, dark: socketio_icon_dark },
  aws: { light: aws_light, dark: aws_dark },
  redux: { svg: redux },
  graphql: { svg: graphql },
  javascript: { svg: javascript },
  jwt: { svg: jwt },
};

function monogram(label: string) {
  const parts = label.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function SvglInline({
  svg,
  className,
}: {
  svg: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("project-workflow-mark svgl-inline", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function SvglMark({ mark }: { mark: SvglSrc }) {
  if ("light" in mark) {
    return (
      <>
        <SvglInline svg={mark.light} className="svgl-light" />
        <SvglInline svg={mark.dark} className="svgl-dark" />
      </>
    );
  }

  if (mark.invertOnDark) {
    return <SvglInline svg={mark.svg} className="svgl-invert-dark" />;
  }

  return <SvglInline svg={mark.svg} />;
}

export function StackIcon({ id, label }: StackIconProps) {
  const svgl = SVGL[id];
  if (svgl) return <SvglMark mark={svgl} />;

  return (
    <span className="project-workflow-mono" aria-hidden="true">
      {monogram(label)}
    </span>
  );
}
