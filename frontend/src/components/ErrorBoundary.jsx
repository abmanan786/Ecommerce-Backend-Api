import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  RefreshCcw,
  Home,
  ChevronDown,
  Bug,
  Copy,
} from "lucide-react";

const cn = (...c) => c.filter(Boolean).join(" ");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      showDetails: false,
      error: null,
      info: null,
      copied: false, // ✅ NEW
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
    this.setState({ info });
  }

  handleTryAgain = () => {
    this.setState({
      hasError: false,
      showDetails: false,
      error: null,
      info: null,
      copied: false,
    });
  };

  // ✅ NEW: Build bug report text
  buildBugReportText = () => {
    const { error, info } = this.state;

    const report = {
      app: "Swiss Eagle Ecommerce",
      time: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      message: error?.message || String(error || "Unknown error"),
      stack: error?.stack || "",
      componentStack: info?.componentStack || "",
    };

    return [
      "=== BUG REPORT ===",
      `App: ${report.app}`,
      `Time: ${report.time}`,
      `URL: ${report.url}`,
      `UserAgent: ${report.userAgent}`,
      "",
      `Message: ${report.message}`,
      "",
      "---- Stack ----",
      report.stack || "(no stack)",
      "",
      "---- Component Stack ----",
      report.componentStack || "(no component stack)",
      "",
    ].join("\n");
  };

  // ✅ NEW: Copy report to clipboard
  handleReportBug = async () => {
    try {
      const text = this.buildBugReportText();

      await navigator.clipboard.writeText(text);

      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 1500);

      // simple confirmation (optional)
      // alert("Bug report copied to clipboard!");
    } catch (e) {
      alert("Clipboard copy failed. Please copy details manually.");
    }
  };

  render() {
    if (this.state.hasError) {
      const message =
        this.state.error?.message ||
        "An unexpected error occurred. Please try again.";

      return (
        <section className="min-h-screen relative overflow-hidden bg-linear-to-br from-black via-[#141414] to-black text-white">
          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#b99c79]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60 text-center">
              Swiss Eagle • System Notice
            </p>

            <div className="mt-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-[#b99c79]/15 border border-white/10 flex items-center justify-center">
                  <AlertTriangle className="text-[#b99c79]" size={26} />
                </div>

                <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-center">
                  Something went wrong
                </h1>

                <p className="mt-3 text-center text-white/75 leading-relaxed">
                  The app encountered an unexpected error. Your data is safe —
                  please try again, refresh, or report the bug.
                </p>

                <div className="mt-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                    Error
                  </p>
                  <p className="mt-1 text-sm text-white/80 wrap-break-words">
                    {message}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    onClick={this.handleTryAgain}
                    className="h-11 rounded-xl font-semibold bg-[#b99c79] text-black hover:bg-[#d2b38c] transition inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={18} />
                    Try Again
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="h-11 rounded-xl font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={18} />
                    Refresh
                  </button>

                  <Link
                    to="/"
                    className="h-11 rounded-xl font-semibold border border-white/25 hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
                  >
                    <Home size={18} />
                    Home
                  </Link>

                  {/* ✅ NEW: Report bug */}
                  <button
                    onClick={this.handleReportBug}
                    className="h-11 rounded-xl font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition inline-flex items-center justify-center gap-2"
                    title="Copy bug report to clipboard"
                  >
                    {this.state.copied ? (
                      <>
                        <Copy size={18} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Bug size={18} />
                        Report
                      </>
                    )}
                  </button>
                </div>

                {/* Details toggle */}
                <div className="mt-7">
                  <button
                    onClick={() =>
                      this.setState((s) => ({ showDetails: !s.showDetails }))
                    }
                    className="w-full h-11 rounded-xl font-semibold text-white/80 border border-white/10 hover:bg-white/5 transition inline-flex items-center justify-center gap-2"
                  >
                    <ChevronDown
                      size={18}
                      className={cn(
                        "transition-transform",
                        this.state.showDetails && "rotate-180",
                      )}
                    />
                    {this.state.showDetails ? "Hide Details" : "Show Details"}
                  </button>

                  {this.state.showDetails && (
                    <div className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                        Debug Details
                      </p>

                      <pre className="mt-3 text-[12px] leading-relaxed text-white/75 whitespace-pre-wrap wrap-break-words">
                        {String(
                          this.state.error?.stack ||
                            this.state.error ||
                            "No stack",
                        )}
                      </pre>

                      {this.state.info?.componentStack && (
                        <>
                          <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/50">
                            Component Stack
                          </p>
                          <pre className="mt-3 text-[12px] leading-relaxed text-white/75 whitespace-pre-wrap wrap-break-words">
                            {String(this.state.info.componentStack)}
                          </pre>
                        </>
                      )}

                      {/* ✅ Optional: also show report text preview */}
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                          Bug Report Preview
                        </p>
                        <pre className="mt-3 text-[12px] leading-relaxed text-white/75 whitespace-pre-wrap wrap-break-words">
                          {this.buildBugReportText()}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                <p className="mt-8 text-center text-xs text-white/55">
                  Support:{" "}
                  <a
                    className="underline text-white"
                    href="mailto:support@example.com"
                  >
                    support@example.com
                  </a>
                </p>
              </div>

              <div className="h-1 w-full bg-linear-to-r from-[#b99c79] via-white/20 to-[#b99c79]" />
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
