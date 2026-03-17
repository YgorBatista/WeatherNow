import InputLocal from '@/app/welcome/local/components/InputLocal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Local from '@/app/hooks/local';

const { SearchCity, handleInputChange, handleSelectLocation, inputRef, isLoading, query, selectedLocation, setQuery, suggestions } = Local();
export function SearchModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className=" bg-[#e0e0e0e3] hover:bg-[#272727e7] hover:text-white dark:bg-[#27272756] hover:dark:bg-[#e0e0e0e3] dark:hover:text-black border-none" variant="outline">
                        Pesquisar cidade
                    </Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[425px] bg-neutral-100 dark:bg-neutral-900 border-none rounded-lg sm:max-w-[660px] min-h-96 flex flex-col justify-between">
                    <DialogHeader className=" h-24 flex flex-col justify-between items-start ">
                        <DialogTitle className="text-black dark:text-white font-bold">Localização</DialogTitle>
                        <InputLocal
                            inputRef={inputRef}
                            query={query}
                            handleInputChange={handleInputChange}
                            handleSelectLocation={handleSelectLocation}
                            suggestions={suggestions}
                            isLoading={isLoading}
                        />
                    </DialogHeader>

                    <DialogFooter className="flex flex-row gap-4 justify-end">
                        <DialogClose asChild>
                            <Button className="w-36" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="w-36">
                            Avançar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
