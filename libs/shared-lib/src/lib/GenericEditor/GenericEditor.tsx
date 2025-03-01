import dynamic from 'next/dynamic';

const UploadEditor = dynamic(() => import('@generic-editor').then((mod) => mod.default), {
  ssr: false,
});

export const GenericEditor = () => {
  return <UploadEditor />;
};

export default GenericEditor;