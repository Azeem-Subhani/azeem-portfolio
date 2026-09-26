import { sportsTeamFonts } from "@/components/capture/capture-fonts";
import { SportsTeamWebShell } from "@/components/capture/sports-team/sports-team-web-shell";

/** 1600×900 Sports team matchday email workflow */
export function SportsTeamWebEmailsCapture() {
  return (
    <div className={`sports-team-capture-root ${sportsTeamFonts}`}>
      <SportsTeamWebShell activeNav="emails" topbarTitle="Matchday emails" topbarSub="RAG drafts from team context">
        <div className="emails-layout">
          <article className="card panel emails-compose">
            <header className="panel-head">
              <div data-h="2">Pre-game draft</div>
              <span className="pill pill--grey">Draft</span>
            </header>

            <p className="mail-subject">Harbour Rovers away, what to bring</p>
            <p className="mail-body">
              Squad, kick-off is 15:00 at Dockside Park. Arrive by 13:30 for warm-up. Both kits travel, the forecast is wet and the far pitch drains slowly.
            </p>

            <div className="emails-toolbar">
              <button type="button" className="btn btn--ghost btn--sm">
                Regenerate
              </button>
              <button type="button" className="btn btn--primary btn--sm">
                Review and send
              </button>
            </div>
          </article>

          <aside className="emails-context">
            <article className="card panel">
              <header className="panel-head">
                <div data-h="2">Retrieved context</div>
                <span className="pill pill--mint">RAG</span>
              </header>
              <ul className="context-list">
                <li>
                  <span className="context-tag">Fixture</span>
                  <span>Sat 14 Mar, 15:00, Dockside Park Pitch 2</span>
                </li>
                <li>
                  <span className="context-tag">Squad</span>
                  <span>22 players, 18 confirmed available</span>
                </li>
                <li>
                  <span className="context-tag">Weather</span>
                  <span>Saturday forecast, light rain after noon</span>
                </li>
                <li>
                  <span className="context-tag">Venue notes</span>
                  <span>Far pitch, bring both kits from chat thread</span>
                </li>
              </ul>
            </article>

            <article className="card panel">
              <header className="panel-head">
                <div data-h="2">Scheduled sends</div>
              </header>
              <ul className="rows">
                <li className="row">
                  <span className="row-name">Pre-game, First Team</span>
                  <span className="pill pill--sand">Fri 20:00</span>
                </li>
                <li className="row">
                  <span className="row-name">Post-game recap</span>
                  <span className="pill pill--grey">Pending result</span>
                </li>
              </ul>
            </article>
          </aside>
        </div>
      </SportsTeamWebShell>
    </div>
  );
}
