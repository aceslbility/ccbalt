<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { partners, contacts, docs } from "$lib/env";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

cobalt helps you save anything from your favorite websites: video, audio, photos or gifs. just paste the link and you're ready to rock!

no ads, trackers, paywalls, or other nonsense. just a convenient web app that works anywhere and whenever you need it.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

cobalt was created for public benefit, to protect people from ads and malware pushed by alternatives.
we believe that the best software is safe, open, and accessible.

it's possible thanks to our long-standing infrastructure partner, [royalehosting.net]({partners.royalehosting})!
</section>

<section id="privacy">
<SectionHeading
    title={$t("about.heading.privacy")}
    sectionId="privacy"
/>

all requests to backend are anonymous and all tunnels are encrypted.
we have a strict zero log policy and don't track *anything* about individual people.

to avoid caching or storing downloaded files, cobalt processes them on-the-fly, sending processed pieces directly to client.
this technology is used when your request needs additional processing, such as when source service stores video & audio in separate files.

for even higher level of protection, you can [ask cobalt to always tunnel everything](/settings/privacy#tunnel).
when enabled, cobalt will proxy everything through itself. no one will know what you download, even your network provider/admin.
all they'll see is that you're using cobalt.
</section>

<section id="speed">
<SectionHeading
    title={$t("about.heading.speed")}
    sectionId="speed"
/>

since we don't rely on any existing downloaders and develop our own from ground up,
cobalt is extremely efficient and a processing server can run on basically any hardware.

main processing instances are hosted on several dedicated servers in several countries,
to reduce latency and distribute the traffic.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

cobalt is used by countless artists, educators, and content creators to do what they love.
we're always on the line with our community and work together to create even more useful tools for them.
feel free to [join the conversation](/about/community)!

we believe that the future of the internet is open, which is why cobalt is [source first](https://sourcefirst.com/) and [easily self-hostable]({docs.instanceHosting}). you can [check the source code & contribute to cobalt]({contacts.github})
at any time, we welcome all contributions and suggestions.

you can use any processing instances hosted by the community, including your own.
if your friend hosts one, just ask them for a domain and [add it in instance settings](/settings/instances#community).
</section>

<section id="local">
<SectionHeading
    title={$t("about.heading.local")}
    sectionId="local"
/>

new features, such as [remuxing](/remux), work on-device.
on-device processing is efficient and never sends anything over the internet.
it perfectly aligns with our future goal of moving as much processing as possible to client.

</section>
