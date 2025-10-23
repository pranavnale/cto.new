import { AnalyticsPreview } from "@/components/analytics-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Download, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">PulseMetrics Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor performance trends and gain insights with a modern analytics toolkit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input type="search" placeholder="Search reports" className="hidden w-48 sm:block" />
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                Admin
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Tabs defaultValue="overview" className="flex flex-col gap-6">
        <TabsList className="self-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Active Sessions</CardTitle>
                <CardDescription>Real-time engagement across all properties.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <AnalyticsPreview />
            </CardContent>
            <CardFooter className="justify-between text-sm text-muted-foreground">
              <span>Updated 2 minutes ago</span>
              <Button variant="link" size="sm" className="px-0">
                View details
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Weekly change in acquisition funnel performance.</CardDescription>
              </CardHeader>
              <CardContent className="text-3xl font-semibold">4.3%</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>Across all support channels in the last 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="text-3xl font-semibold">1m 42s</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate detailed exports and recurring summaries.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button>Generate new report</Button>
              <Button variant="outline" className="gap-1">
                <Settings className="h-4 w-4" />
                Configure automations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Customize notification thresholds and severity.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No critical alerts. Continue monitoring to stay ahead of potential risks.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
