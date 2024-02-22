import { Box, Image, Spinner } from "@chakra-ui/react";
import { useState } from "react";

interface ImageWithSpinnerProps {
    src: string;
    alt: string;
  }
 export const ImageWithSpinner: React.FC<ImageWithSpinnerProps> = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" p={3} rounded={20} maxW={{ base: '100%', sm: '300px' }}>
                    <Spinner />
                </Box>
            )}
            <Image
                p={3}
                rounded={20}
                objectFit='cover'
                maxW={{ base: '100%', sm: '300px' }}
                src={src}
                alt={alt}
                display={isLoading ? 'none' : 'block'}
                onLoad={() => setIsLoading(false)}
            />
        </>
    );
};