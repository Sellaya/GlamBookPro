import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Home() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          {/* Sidebar content goes here */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-4xl font-bold">Welcome to GlamBookPro</h1>
        </main>
      </SidebarInset>
    </>
  );
}
