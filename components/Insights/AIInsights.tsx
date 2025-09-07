"use client";

import { useState, useEffect } from "react";
import { getAIInsights } from "@/app/actions/getAIInsights";
import { generateInsightAnswer } from "@/app/actions/generateInsightAnswer";
import UIIcon from "../UIIcon";
import StatusBadge from "../StatusBadge";
import Card from "../Card";

interface InsightData {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

interface AIAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const newInsights = await getAIInsights();
      setInsights(newInsights);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("❌ AIInsights: Failed to load AI insights:", error);
      // Fallback to mock data if AI fails
      setInsights([
        {
          id: "fallback-1",
          type: "info",
          title: "AI Temporarily Unavailable",
          message:
            "We're working to restore AI insights. Please check back soon.",
          action: "Try again later",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = async (insight: InsightData) => {
    if (!insight.action) return;

    // Check if answer is already loading or exists
    const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
    if (existingAnswer) {
      // Remove the answer if it already exists (toggle functionality)
      setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
      return;
    }

    // Add loading state
    setAiAnswers((prev) => [
      ...prev,
      {
        insightId: insight.id,
        answer: "",
        isLoading: true,
      },
    ]);

    try {
      // Generate question based on insight title and action
      const question = `${insight.title}: ${insight.action}`;

      // Use server action to generate AI answer
      const answer = await generateInsightAnswer(question);

      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id ? { ...a, answer, isLoading: false } : a
        )
      );
    } catch (error) {
      console.error("❌ Failed to generate AI answer:", error);
      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id
            ? {
                ...a,
                answer:
                  "Sorry, I was unable to generate a detailed answer. Please try again.",
                isLoading: false,
              }
            : a
        )
      );
    }
  };

  // useEffect(() => {
  //   loadInsights();
  // }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "warning";
      case "success":
        return "check";
      case "tip":
        return "lightbulb";
      case "info":
        return "info";
      default:
        return "robot";
    }
  };

  const getInsightColors = (type: string) => {
    switch (type) {
      case "warning":
        return "border-l-warning bg-warning/10";
      case "success":
        return "border-l-success bg-success/10";
      case "tip":
        return "border-l-accent bg-accent/10";
      case "info":
        return "border-l-primary bg-primary/10";
      default:
        return "border-l-base-100 bg-base-100/50";
    }
  };

  const getButtonColors = (type: string) => {
    switch (type) {
      case "warning":
        return "text-warning/80 hover:text-warning";
      case "success":
        return "text-success/80 hover:text-success";
      case "tip":
        return "text-accent/80 hover:text-accent";
      case "info":
        return "text-primary/80 hover:text-primary";
      default:
        return "text-neutral-content/80 hover:text-neutral-content";
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Loading...";

    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return lastUpdated.toLocaleDateString();
  };

  const headingChildren = (): React.ReactNode => {
    if (isLoading)
      return (
        <div className="bg-base-100/50 text-primary py-0.5 px-2 rounded-sm flex items-center gap-2">
          <span className="loading loading-bars loading-xs" />
          <span className="text-sm">Analyzing</span>
        </div>
      );
    if (lastUpdated)
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <StatusBadge text={formatLastUpdated()} status="success" />
          <button
            onClick={loadInsights}
            className="gradient-primary w-7 h-7 rounded-full grid place-items-center shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
          >
            <UIIcon iconName="refresh" className="!text-lg" />
          </button>
        </div>
      );
    return null;
  };

  const LoadingCard = () => {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton card card-sm opacity-50">
              <div className="card-body">
                <div className="grid gap-3 grid-cols-[auto_1fr]">
                  <div className="shrink-0 bg-neutral w-8 h-8 rounded-full"></div>
                  <div className="w-full space-y-2">
                    <div className="skeleton bg-neutral h-3 rounded-lg w-3/4"></div>
                    <div className="skeleton bg-neutral h-3 rounded-lg w-full"></div>
                    <div className="skeleton bg-neutral h-3 rounded-lg w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t text-xs sm:text-sm flex items-center justify-center gap-2">
          <span className="status status-primary animate-pulse" />
          <span>AI is analyzing your financial patterns...</span>
        </div>
      </>
    );
  };

  const InitialCard = () => {
    return (
      <>
        <p className="mb-6">
          Get intelligent analysis of your spending patterns with personalized
          AI recommendations and automated category suggestions that learn from
          your behavior.
        </p>
        <button className="btn btn-primary" onClick={loadInsights}>
          Explore Your AI Insights
        </button>
      </>
    );
  };

  const FullCard = () => {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {insights.map((insight) => {
            const currentAnswer = aiAnswers.find(
              (a) => a.insightId === insight.id
            );

            return (
              <div
                key={insight.id}
                className={`card card-sm border-l-4 hover:shadow-lg transition-all duration-200 ${getInsightColors(
                  insight.type
                )}`}
              >
                <div className="card-body">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div
                      className={`rounded-full grid place-items-center size-8 ${
                        insight.type === "warning"
                          ? "bg-warning/30"
                          : insight.type === "success"
                          ? "bg-success/60"
                          : insight.type === "tip"
                          ? "bg-accent/60"
                          : "bg-primary/60"
                      }`}
                    >
                      <UIIcon
                        iconName={getInsightIcon(insight.type)}
                        className="!text-base"
                      />
                    </div>
                    <h4 className="font-bold">{insight.title}</h4>
                  </div>
                  {insight.confidence && insight.confidence < 0.8 && (
                    <StatusBadge text="Preliminary" status="warning" />
                  )}
                  <p className="text-neutral-content/90 text-xs leading-relaxed mb-3">
                    {insight.message}
                  </p>
                  {insight.action && (
                    <div className="text-left">
                      <span
                        onClick={() => handleActionClick(insight)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs cursor-pointer transition-all duration-200 ${getButtonColors(
                          insight.type
                        )} hover:bg-white/50 dark:hover:bg-gray-700/50 ${
                          currentAnswer ? "bg-white/50 dark:bg-gray-700/50" : ""
                        }`}
                      >
                        <span>{insight.action}</span>
                        {currentAnswer?.isLoading ? (
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <span className="text-xs">
                            {currentAnswer ? "↑" : "→"}
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* AI Answer Display */}
                  {currentAnswer && (
                    <div className="mt-3 p-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-xs mb-1">
                            AI Answer:
                          </h5>
                          {currentAnswer.isLoading ? (
                            <div className="space-y-1">
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-full"></div>
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-3/4"></div>
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-1/2"></div>
                            </div>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                              {currentAnswer.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIIcon iconName="network_intel_node" className="text-sm" />
              <span className="font-medium text-xs">
                Powered by AI analysis
              </span>
            </div>
            <button
              onClick={loadInsights}
              className="btn btn-sm btn-accent gradient-primary hover:gradient-primary/60"
            >
              Refresh Insights →
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card
      title="AI Insights"
      iconName="network_intel_node"
      desc="AI financial analysis"
      headingChildren={headingChildren()}
    >
      {isLoading ? (
        <LoadingCard />
      ) : insights.length > 0 ? (
        <FullCard />
      ) : (
        <InitialCard />
      )}
    </Card>
  );
};

export default AIInsights;
