import {useDocStore} from '../store/useDocStore';
import FileQueueItem from './FileQueueItem';

export default function FileQueue() {
  const {files} = useDocStore();

  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-1 px-1">Uploaded Files ({files.length})</h3>
      {files.map((fileState) => (
        <FileQueueItem key={fileState.id} fileState={fileState} />
      ))}
    </div>
  );
}
