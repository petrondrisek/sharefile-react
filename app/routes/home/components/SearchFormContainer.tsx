import { useInput } from '../hooks/useInput';
import SearchInput from './SearchInput';
import SearchSubmitButton from './SearchSubmitButton';
import ImageScan from '~/modules/ImageScan/ImageScan';
import CameraScan from '~/modules/CameraScan/CameraScan';

const SearchFormContainer = () => {
    const { search, error, disabled, onChange } = useInput();

    const handleClick = () => window.location.href = search;
  
    return (<>
        <SearchInput onChange={onChange} error={error} />

        <div className="flex items-center justify-center gap-2 my-4">
            <SearchSubmitButton onClick={handleClick} disabled={disabled} />
            <ImageScan />
            <CameraScan />
        </div>
    </>)
}

export default SearchFormContainer