import FetchWorker from "$lib/workers/fetch?worker";

import { killWorker } from "$lib/task-manager/run-worker";
import { updateWorkerProgress } from "$lib/state/task-manager/current-tasks";
import { pipelineTaskDone, itemError, queue } from "$lib/state/task-manager/queue";

import type { CobaltQueue } from "$lib/types/queue";

export const runFetchWorker = async (workerId: string, parentId: string, url: string) => {
    const worker = new FetchWorker();

    const unsubscribe = queue.subscribe((queue: CobaltQueue) => {
        if (!queue[parentId]) {
            // TODO: remove logging
            console.log("worker's parent is gone, so it killed itself");
            killWorker(worker, unsubscribe);
        }
    });

    worker.postMessage({
        cobaltFetchWorker: {
            url
        }
    });

    worker.onmessage = (event) => {
        const eventData = event.data.cobaltFetchWorker;
        if (!eventData) return;

        if (eventData.progress) {
            updateWorkerProgress(workerId, {
                percentage: eventData.progress,
                size: eventData.size,
            })
        }

        if (eventData.result) {
            killWorker(worker, unsubscribe);
            return pipelineTaskDone(
                parentId,
                workerId,
                eventData.result,
            );
        }

        if (eventData.error) {
            killWorker(worker, unsubscribe);
            return itemError(parentId, workerId, eventData.error);
        }
    }
}
