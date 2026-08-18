"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Production-grade React error boundary.
 * Catches render errors in sub-views and shows a friendly recovery UI.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message ?? "Unknown error" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production this would ship to Sentry / logging service
    console.error("[ErrorBoundary] Caught render error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[320px] gap-5 p-8 text-center rounded-2xl bg-white border border-red-100 shadow-xs">
          <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="text-sm font-bold text-gray-900">
              {this.props.fallbackTitle ?? "Something went wrong"}
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              An unexpected error occurred while loading this view. Your progress is safe.
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-[10px] font-mono text-red-400 bg-red-50 rounded-lg p-2 mt-2 text-left break-all">
                {this.state.errorMessage}
              </p>
            )}
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-bold transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
