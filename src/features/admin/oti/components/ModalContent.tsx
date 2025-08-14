import React from 'react';

interface Props {
    fields: any
    dataSiga: any
}

const ModalContent: React.FC<Props> = ({ fields, dataSiga }) => {

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {fields
                    .map((field: any, idx: number) => (
                        <div
                            key={idx}
                            className="p-3 border rounded-lg shadow-sm bg-muted hover:bg-muted/70 transition-colors"
                        >
                            <p className="text-xs font-semibold text-muted-foreground">{field.label}</p>
                            <p className="text-sm font-medium">{field.value}</p>
                        </div>
                    ))}

            </div>
            <p className='text-blue-400 font-bold text-sm my-4'>Datos SIGA</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {dataSiga
                    .map((field: any, idx: number) => (
                        <div
                            key={idx}
                            className="p-3 border-blue-200 border rounded-lg shadow-sm bg-blue-100 hover:bg-blue-100/60 transition-colors"
                        >
                            <p className="text-xs font-semibold text-muted-foreground">{field.label}</p>
                            <p className="text-sm font-medium">{field.value}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ModalContent;
