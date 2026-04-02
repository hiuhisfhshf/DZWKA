using AutoMapper;
using WEB_API.BLL.Dtos.Auth;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.MapperProfiles.Auth;

public class AuthMapperProfile : Profile
{
    public AuthMapperProfile()
    {
        CreateMap<UserEntity, UserDTO>()
            .ForMember(dest => dest.FullName,
                opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));
    }
}

