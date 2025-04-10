import LibAVWrapper from "$lib/libav";

import type { FileInfo } from "$lib/types/libav";
import type { CobaltFileReference } from "$lib/types/storage";

const error = (code: string) => {
    self.postMessage({
        cobaltRemuxWorker: {
            error: `error.${code}`,
        }
    })
}

const remux = async (files: CobaltFileReference[], args: string[], output: FileInfo) => {
    if (!(files && output && args)) return;

    const ff = new LibAVWrapper((progress) => {
        self.postMessage({
            cobaltRemuxWorker: {
                progress: {
                    durationProcessed: progress.out_time_sec,
                    speed: progress.speed,
                    size: progress.total_size,
                    currentFrame: progress.frame,
                    fps: progress.fps,
                }
            }
        })
    });

    ff.init();

    try {
        // probing just the first file in files array (usually audio) for duration progress
        const probeFile = files[0]?.file;
        if (!probeFile) return error("couldn't probe one of files");

        const file_info = await ff.probe(probeFile).catch((e) => {
            if (e?.message?.toLowerCase().includes("out of memory")) {
                console.error("uh oh! out of memory");
                console.error(e);

                error("remux.out_of_resources");
                self.close();
            }
        });

        if (!file_info?.format) {
            return error("remux.corrupted");
        }

        self.postMessage({
            cobaltRemuxWorker: {
                progress: {
                    duration: Number(file_info.format.duration),
                }
            }
        });

        for (const file of files) {
            if (!file.type) {
                // TODO: better & more appropriate error code
                return error("remux.corrupted");
            }
        }

        const render = await ff
            .render({
                files,
                output,
                args,
            })
            .catch((e) => {
                console.error("uh-oh! render error");
                console.error(e);
                // TODO: better error codes, there are more reasons for a crash
                error("remux.out_of_resources");
            });

        if (!render) {
            console.log("not a valid file");
            return error("incorrect input or output");
        }

        await ff.terminate();

        self.postMessage({
            cobaltRemuxWorker: {
                render
            }
        });
    } catch (e) {
        console.log(e);
        return error("remux.crashed");
    }
}

self.onmessage = async (event: MessageEvent) => {
    const ed = event.data.cobaltRemuxWorker;
    if (ed) {
        if (ed.files && ed.args && ed.output) {
            await remux(ed.files, ed.args, ed.output);
        }
    }
}
