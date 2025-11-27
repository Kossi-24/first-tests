import {
  Card,
  CardContent,
} from "@/components/ui/card"

export function StatsCards({ title, amount, icon }) {
  return (
    <Card className="relative w-70 h-30 rounded-2xl border border-slate-100 bg-white text-gray-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <CardContent className="h-full p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
              {amount}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white dark:bg-sky-500">
              {icon}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}
