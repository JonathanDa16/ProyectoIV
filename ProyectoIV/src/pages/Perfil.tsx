import { UserProfile } from "@/components/user-profile"
import { featureFlags } from "@/config/featureFlags"

export default function ProfilePage() {
    if (featureFlags.deployment.usuariosEnConstruccion) {
        return <div className="container mx-auto px-4 py-16 text-center text-2xl font-semibold">En construccion</div>
    }

    return <UserProfile />
}
