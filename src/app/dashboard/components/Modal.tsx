import Local from '@/app/hooks/local';
import InputLocal from '@/app/local/components/InputLocal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';

export function Modal() {
    const { inputRef, query, handleInputChange, suggestions, isLoading, handleSelectLocation, SearchCity } = Local();

    return (
        <Dialog>
            <form className="my-6 ">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 3, ease: 'backInOut' }}>
                    <DialogTrigger asChild>
                        <Button
                            className=" flex dark:bg-neutral-600 hover:bg-white shadow-md hover:shadow-lg border-transparent justify-evenly w-36 hover:w-48 transition-all duration-300 "
                            variant="outline"
                        >
                            <SearchIcon /> Pesquisar
                        </Button>
                    </DialogTrigger>
                </motion.div>
                <DialogContent className=" w-[95%] rounded-lg sm:max-w-[625px] dark:bg-neutral-800 h-[200px] flex flex-col items-center justify-around ">
                    <DialogHeader>
                        <DialogTitle className="font-bold">Localização</DialogTitle>
                    </DialogHeader>

                    <InputLocal
                        inputRef={inputRef}
                        query={query}
                        handleInputChangeAction={handleInputChange}
                        handleSelectLocationAction={handleSelectLocation}
                        suggestions={suggestions}
                        isLoading={isLoading}
                    />

                    <DialogFooter className="flex-row justify-end gap-4  w-80 ss:w-96">
                        <DialogClose asChild>
                            <Button className="w-20  dark:bg-neutral-700 dark:border-none" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="w-20" type="submit" onClick={SearchCity}>
                                Avançar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
