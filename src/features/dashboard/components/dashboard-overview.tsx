import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Replace this with stats, tables, and charts from your domain layer.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Moments", "Friends", "Activity"].map((title) => (
          <Card key={title} className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>Placeholder metric card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">—</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
