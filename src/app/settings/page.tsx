import { SettingsPanel } from "@/components/settings/settings-panel";

export default function SettingsPage() {
	return (
		<main className="min-h-svh pb-20">
			<div className="px-4 pt-6">
				<h1 className="mb-6 text-xl font-semibold">設定</h1>
			</div>
			<SettingsPanel />
		</main>
	);
}
