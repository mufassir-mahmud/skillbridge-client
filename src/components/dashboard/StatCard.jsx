"use client";

import React from "react";
import { Card } from "@heroui/react";
import { ArrowUpRight } from "@gravity-ui/icons";

const colorStyles = {
  primary: {
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50",
    badge: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
  },
  blue: {
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50",
    badge: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  },
  orange: {
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50",
    badge: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  },
  green: {
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50",
    badge: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  },
  red: {
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50",
    badge: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30",
  },
};

/**
 * Reusable StatCard component built with Hero UI Card and Gravity UI Icons
 *
 * @param {Object} props
 * @param {string} props.title - Card title header
 * @param {string|number} props.value - Metric main value
 * @param {string} [props.description] - Subtext or context line
 * @param {React.ComponentType} [props.icon] - Gravity UI icon component reference
 * @param {'primary'|'blue'|'orange'|'green'|'red'} [props.color='primary'] - Color theme accent
 * @param {string} [props.trend] - Percentage/numeric trend string (e.g. "+12%")
 * @param {string} [props.className] - Extra Tailwind classes
 */
export default function StatCard({
  title,
  value,
  description,
  icon: IconComponent,
  color = "primary",
  trend,
  className = "",
}) {
  const activeColor = colorStyles[color] || colorStyles.primary;

  return (
    <Card
      variant="default"
      className={`w-full transition-all duration-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md ${className}`}
    >
      <Card.Header className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Card.Title className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {title}
        </Card.Title>
        {IconComponent && (
          <div className={`p-2 rounded-xl ${activeColor.iconBg}`}>
            <IconComponent width={18} height={18} />
          </div>
        )}
      </Card.Header>

      <Card.Content className="pt-0 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {value}
          </div>
          {trend && (
            <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${activeColor.badge}`}>
              <ArrowUpRight width={12} height={12} className="mr-0.5 stroke-2" />
              {trend}
            </span>
          )}
        </div>

        {description && (
          <Card.Description className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
            {description}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
}