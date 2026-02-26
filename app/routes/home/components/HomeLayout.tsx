import PageTitle from '~/_shared/components/PageTitle'
import SearchFormContainer from './SearchFormContainer'
import RouteLink from '~/_shared/components/RouteLink'
import TransparentContainer from '~/_shared/components/TransparentContainer'

export const HomeLayout = () => {
  return (
    <TransparentContainer>
        <PageTitle>Sharefile</PageTitle>

        <SearchFormContainer />

        <RouteLink to="/upload">&#x2B; Upload new files</RouteLink>
    </TransparentContainer>
  )
}
