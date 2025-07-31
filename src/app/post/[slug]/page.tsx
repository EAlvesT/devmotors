import { Suspense } from 'react';
import { getItemBySlug } from '@/utils/actions/get-data';
import { PostProps } from '@/utils/post.type';
import { Metadata } from 'next';
import { Content } from './components/content';
import { LoadingPost } from './components/loading';

export async function generateMetadata({ params }: {
    params: { slug: string }
}): Promise<Metadata> {
    try {
        const { slug } = params;
        const { objects }: PostProps = await getItemBySlug(slug)
            .catch(() => {
                return {
                    title: "DevMotors - Sua oficina especializada!",
                    description: "Oficina de carros em São Paulo"
                }
            })

        return {
            title: `DevMotors - ${objects[0].title}`,
            description: `${objects[0].metadata.description.text}`,
            keywords: ["devmotors", "troca de oleo", "devmotors troca de oleo", `${objects[0].title}`],
            openGraph: {
                images: [objects[0].metadata.banner.url],
                title: `DevMotors - ${objects[0].title}`
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true
                }
            }
        }

    } catch (err) {
        return {
            title: "DevMotors - Sua oficina especializada!",
            description: "Oficina de carros em São Paulo"
        }
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    return (
        <>
            <Suspense fallback={<LoadingPost />}>
                <Content slug={slug} />
            </Suspense>
        </>
    )
}